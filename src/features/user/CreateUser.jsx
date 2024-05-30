import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateUserName } from "./userSlice";
import { useNavigate } from "react-router-dom";
function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return;

    dispatch(updateUserName(username));
    navigation("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-sm md:text-base mb-4">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-72 rounder-full 
        px-4 py-2 text-sm placeholder:text-stone-400
        transition:all duration-300 
        focus:outline-none
        focus:ring focus:ring-yellow-400 
        border border-stone-200 md:px-6 md:py-3;
        mb-8
        "
      />

      {username !== "" && (
        <div>
          <Button>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
