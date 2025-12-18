# Password Generator

A minimal, privacy-focused tool designed to generate passwords with extreme cryptographic strength, intended for use with a dedicated password manager. High-entropy passwords using modern security best practices. No storage, no tracking—just safe credentials on demand.

## Why This Generator?

Most common users struggle to create truly secure passwords. In the current threat landscape, many password generators offer only basic security (simple 10–12 character passwords) that may not be sufficient against advanced, modern brute-force attacks.

This generator is built on the philosophy of "security through over-engineering" to provide the highest practical level of entropy and future proof your credentials.

The most important factor in password security is length, as it exponentially increases the number of possible combinations an attacker would have to try in a brute force attack. Leading organizations like the National Institute of Standards and Technology (NIST) and CISA recommend a minimum length of 15–16 characters or more. This generator uses **three times** that amount.

### Key Security Features

| Feature | Specification | Security Rationale |
| --- | --- | --- |
| **Fixed Length** | **48 Characters** | This non adjustable length maximizes security and eliminates user-selection error. |
| **Entropy (Strength)** | **~314 Bits** | This is mathematically stronger than modern encryption standards like AES-256 (which uses 256 bits). |
| **Character Sets** | All 4 Sets (Lower, Upper, Digits, Symbols) | Maximizes the character pool to ~94 possible characters, maximizing randomness. |
| **Minimum Requirement** | 1 Character from Each Set | Ensures compliance with overly strict enterprise rules. |

### 314 Bits of Entropy: Unbreakable

A password with over 300 bits of entropy is considered **completely resistant** to brute force attacks by any classical computer, now or in the foreseeable future. The time required to crack it would be measured in a number of years that is practically infinite.

## Compatibility Note

This generator prioritizes extreme security, which may occasionally lead to compatibility issues with non compliant services.

* **Older/Legacy Systems:** Many older or poorly designed systems limit passwords to short lengths (16, 20, or 32 characters). This is generally not a security necessity but a limitation of the old database fields they used.
* **NIST Guidance:** Modern security guidance (like NIST) recommends that systems should allow passwords of at least **64** characters or more.
* **My Stance:** For any site that cannot accept a 48 character password, the platform itself is not up to date on modern security best practices. For any modern, enterprise grade software, the 48 character length should be accepted perfectly fine.
* **Symbol Inclusion:** Note that a colon (`:`) is included by default, which is known to break some legacy scripts, a conscious security choice to ensure maximum randomness.

The output is explicitly designed to be copied directly into a professional password manager (1Password, Bitwarden, LastPass).

## Self-hosting the Generator

If you wish to host this project on your own, simply clone down the repository, and run the web app locally.

```bash
$ git clone https://github.com/jordansmalls/password-generator.git

$ cd password-generator

$ npm install

$ npm run dev # runs on local port 5173
```

## Future Improvements

1. **Adjustable Length Flag (Optional):** Add an optional flag or setting to allow users to generate shorter or longer, high security passwords (ex: 24, 32, 48, 64, 128, 256 characters) to address compatibility issues with older systems or an absurdly future proofed password.
2. **Passphrase Mode:** Implement an option to generate long, memorable passphrases (four or five dictionary words) that are easier to type manually while still offering high entropy.
3. **Ambiguity Filter:** Introduce an option to filter out visually ambiguous characters (like `l`, `1`, `I`, `O`, and `0`) for scenarios where manual entry might be required.

## License

[MIT License](LICENSE)
