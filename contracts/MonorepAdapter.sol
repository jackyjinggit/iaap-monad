// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

/**
 * @title MonorepAdapter
 * @notice IAAP Monad Adapter — minimal agent trust engine on Monad.
 *         Extends the IAAP detector (off-chain) with on-chain provenance
 *         for flattery / halo / 装腔 flags, aligned with ERC-8004
 *         agent identity & reputation.
 * @dev Metropolis hackathon submission v0.1 — team TrueFellow (Jacky Jiang).
 *
 * Privacy guarantee: no content / plaintext is uploaded, only
 * (contentHash, severityScore, submitter, timestamp). The original
 * flagged interaction stays on the user's device or the IAAP front-end.
 */
contract MonorepAdapter {
    // ──────────────────────────────────────────────
    //  Events — these are what front-end / explorers index.
    // ──────────────────────────────────────────────

    /// @notice Emitted when a user flags an interaction hash on chain.
    event IAAPFlagSubmitted(
        bytes32 indexed contentHash,
        address indexed submitter,
        uint8 indexed severityScore,
        uint256 timestamp
    );

    /// @notice Emitted when a submitter's cumulative reputation updates.
    event IAAPReputationUpdated(
        address indexed agent,
        uint256 totalScore,
        uint256 flagCount,
        uint256 timestamp
    );

    // ──────────────────────────────────────────────
    //  Storage
    // ──────────────────────────────────────────────

    /// @dev Has this contentHash already been flagged? (replay-protected)
    mapping(bytes32 => bool) public seen;

    /// @dev Per-submitter aggregate reputation: sum of severityScore across all their flags.
    mapping(address => uint256) public reputationTotalScore;

    /// @dev Per-submitter total flag count (used to compute averages off-chain).
    mapping(address => uint256) public reputationFlagCount;

    /// @dev Total flags ever submitted (global system metric for UI dashboards).
    uint256 public totalFlags;

    // ──────────────────────────────────────────────
    //  Public API
    // ──────────────────────────────────────────────

    /**
     * @notice Flag a content-hash with a 0–5 severity score.
     * @param contentHash   Hash of the flagged interaction (any 32-byte digest — sha256 / blake2 / keccak).
     * @param severityScore IAAP-derived score (0 = clean, 5 = severe flattery / halo / 装腔).
     */
    function flagContent(bytes32 contentHash, uint8 severityScore) external {
        require(severityScore <= 5, "Monorep: score out of range");
        require(!seen[contentHash], "Monorep: already flagged");

        seen[contentHash] = true;

        reputationTotalScore[msg.sender] += severityScore;
        reputationFlagCount[msg.sender] += 1;
        totalFlags += 1;

        emit IAAPFlagSubmitted(
            contentHash,
            msg.sender,
            severityScore,
            block.timestamp
        );
        emit IAAPReputationUpdated(
            msg.sender,
            reputationTotalScore[msg.sender],
            reputationFlagCount[msg.sender],
            block.timestamp
        );
    }

    // ──────────────────────────────────────────────
    //  View helpers
    // ──────────────────────────────────────────────

    /**
     * @notice Returns the per-submitter aggregate reputation.
     * @dev Pair with reputationFlagCount to compute off-chain:
     *      averageSeverity = reputationTotalScore / reputationFlagCount
     */
    function getReputation(address agent)
        external
        view
        returns (uint256 totalScore, uint256 flagCount)
    {
        return (reputationTotalScore[agent], reputationFlagCount[agent]);
    }

    /**
     * @notice Returns the global flag count (for dashboard).
     */
    function getTotalFlags() external view returns (uint256) {
        return totalFlags;
    }
}
