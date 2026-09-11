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
        <h1>My UI Components</h1>

        <Button text="Login" />
        <Button text="Sign Up" />
        <Button text="Submit" />

        <Card
          title="React"
          description="A JavaScript library for building user interfaces."
        />

        <Card
          title="Next.js"
          description="A framework used to build React applications."
        />

        <Input
          label="Name"
          placeholder="Enter your name"
        />

        <Input
          label="Email"
          placeholder="Enter your email"
        />

        
        <Modal
          title="Welcome"
          message="This is my reusable modal component."
        />





      </main>
    </>
  );
}