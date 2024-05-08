(define-public (send-stx (amount uint))
  (let
    (
      (balance (stx-get-balance tx-sender))
      (user tx-sender)
    )
    (asserts! (>= balance amount) (err "not enough STX in your wallet"))
    (unwrap! (stx-transfer? amount user (as-contract tx-sender)) (err "error sending STX"))
    (ok u0)
  )
)

(define-public (get-stx (amount uint) (to principal))
  (let
    (
      (balance (stx-get-balance (as-contract tx-sender)))
      (user tx-sender)
    )
    (asserts! (< amount u1000000000) (err "asking for too many STX"))
    (asserts! (>= balance amount) (err "not enough STX in the faucet"))
    (unwrap! (as-contract (stx-transfer? amount tx-sender user)) (err "error sending STX"))
    (ok u0)
  )
)
