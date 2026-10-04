"use client";
import Button from "./components/Button";

import Card from "./components/Card";
import Input from "./components/Input";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <h1 className="page-title">My UI Components</h1>

        <p className="page-description">
          A collection of simple and reusable React UI components.
        </p>

        <div className="components-grid">
          {/* Button */}
          <div>
            <h2>Button</h2>
            <p>Reusable buttons for different actions.</p>

            <Button onClick={() => alert("Login button clicked")}>
              Login
            </Button>

            <Button onClick={() => alert("Sign Up button clicked")}>
              Sign Up
            </Button>

            <Button onClick={() => alert("Form submitted")}>
              Submit
            </Button>
          </div>

          {/* Card */}
          <div>
            <h2>Card</h2>
            <p>Reusable cards for displaying content.</p>

            <Card
              title="React"
              description="A JavaScript library for building user interfaces."
            />

            <Card
              title="Next.js"
              description="A React framework for building modern web applications."
            />
          </div>

          {/* Input */}
          <div>
            <h2>Input</h2>
            <p>Reusable input fields for forms.</p>

            <Input
              label="Name"
              placeholder="Enter your name"
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          {/* Modal */}
          <div>
            <h2>Modal</h2>
            <p>Reusable modal component for displaying messages.</p>

            <Modal title="Welcome">
              <p>
                This is a reusable modal component built with React.
              </p>
            </Modal>
          </div>
        </div>
      </main>
    </>
  );
}