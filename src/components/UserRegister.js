import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/userlogin.css";
import SocialAuth from "../utils/SocialAuth";
import toast, { Toaster } from "react-hot-toast";

const UserRegister = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  // Retrieving user information from local storage
  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(storedUserInfo);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      email: email,
      full_name: fullname,
      password: password,
    };
    if (password !== confirmpassword) {
      toast.error("Your password doesn't match");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Successfully registered");
        // Setting user information in local storage
        const userData = {
          name: username,
          email: email,
        };
        localStorage.setItem("userInfo", JSON.stringify(userData));

        /* encrypted data */

        // Generate a random initialization vector (IV)
        function generateIV() {
          return crypto.getRandomValues(new Uint8Array(16));
        }

        // Encrypt user data and store it in local storage
        function encryptAndStoreData(userData, encryptionKey) {
          // Convert the user data to a string
          const stringifiedUserData = JSON.stringify(userData);

          // Generate an IV
          const iv = generateIV();

          // Convert the data to an ArrayBuffer
          const dataBuffer = new TextEncoder().encode(stringifiedUserData);

          // Encrypt the data using the encryption key and IV
          crypto.subtle
            .encrypt({ name: "AES-CBC", iv }, encryptionKey, dataBuffer)
            .then((encryptedData) => {
              // Store the encrypted data and IV in local storage
              localStorage.setItem(
                "encryptedData",
                new Uint8Array(encryptedData)
              );
              localStorage.setItem("iv", new Uint8Array(iv));
              console.log("User data encrypted and stored in local storage");
            })
            .catch((error) => {
              console.error("Error encrypting and storing user data:", error);
            });
        }

        // Decrypt user data from local storage
        function decryptStoredData(encryptionKey) {
          // Retrieve the encrypted data and IV from local storage
          const encryptedData = localStorage.getItem("encryptedData");
          const iv = localStorage.getItem("iv");

          // Convert the data back to Uint8Arrays
          const encryptedDataArray = new Uint8Array(encryptedData);
          const ivArray = new Uint8Array(iv);

          // Decrypt the data using the encryption key and IV
          crypto.subtle
            .decrypt(
              { name: "AES-CBC", iv: ivArray },
              encryptionKey,
              encryptedDataArray
            )
            .then((decryptedData) => {
              // Convert the decrypted data to a string
              const decryptedString = new TextDecoder().decode(decryptedData);

              // Parse the decrypted user data
              const decryptedUserData = JSON.parse(decryptedString);

              console.log("Decrypted user data:", decryptedUserData);
            })
            .catch((error) => {
              console.error("Error decrypting stored user data:", error);
            });
        }

        // Generate a cryptographic key for encryption/decryption
        crypto.subtle
          .generateKey({ name: "AES-CBC", length: 256 }, true, [
            "encrypt",
            "decrypt",
          ])
          .then((key) => {
            // Store the encryption key for later use
            const encryptionKey = key;

            // Example user data
            /* const userData = {
              id: 1,
              name: "John Doe",
              email: "johndoe@example.com",
            }; */

            // Encrypt and store the user data
            encryptAndStoreData(userData, encryptionKey);

            // Decrypt the stored data
            decryptStoredData(encryptionKey);
          })
          .catch((error) => {
            console.error("Error generating encryption key:", error);
          });
        navigate("/chat");
        /* encrypted data */
        console.log(data);
        // Perform any necessary actions after successful registration
      } else {
        console.log(response);
        toast.error("Registration failed");
        // Handle registration error
      }
    } catch (error) {
      console.error(error);
      // Handle network error
    }
  };

  return (
    <div className="body">
      <div className="login-page">
        <div className="form">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
          <p className="message">
            Already registered? <Link to="/">Login</Link>
          </p>
          <h4 className="divider-box">
            <span className="or">Or</span>
          </h4>
          <div>
            <SocialAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
