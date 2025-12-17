import { useState } from "react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import generatePassword from "../generator/generate-password.js";
import { toast } from "sonner";
import PasswordDisplay from "./password-display.tsx";
const GeneratePasswordButton = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const newPassword = await generatePassword();
      setPassword(newPassword);
      toast.success("Password Generated.", {
        description:
          "Copy the password to clipboard and add to your password manager.",
      });
    } catch (error) {
      console.error(error);
      toast.error("Oops!", {
        description:
          "We're having trouble generating you a safe password, please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText =
    password.length < 1 ? "Generate Password" : "Generate Another Password";

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Button
        variant={"default"}
        className="w-[14rem] transition ease-in duration-200"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            Generating
            <Spinner className="h-4 w-4" />
          </>
        ) : (
          buttonText
        )}
      </Button>

      {password.length > 0 && (
        <div className="lg:w-[40rem] w-[22rem] mx-auto my-4">
          <PasswordDisplay
            password={password}
            onCopy={() =>
              toast.success("Copied to Clipboard.", {
                description:
                  "Nice, now go ahead and paste this in your password manager.",
              })
            }
          />
        </div>
      )}
    </div>
  );
};

export default GeneratePasswordButton;
