import { ModeToggle } from "./mode-toggle";

const Footer = () => {
  return (
    <footer className="flex gap-4 items-center">
      <a
        href="https://github.com/jordansmalls/password-generator/blob/main/README.md"
        target="_blank"
        className="hover:text-primary transition ease-in duration-200"
      >
        Why?
      </a>
      <a
        href="https://www.jsmalls.net"
        target="_blank"
        className="hover:text-primary transition ease-in duration-200"
      >
        Contact
      </a>
      <ModeToggle />
    </footer>
  );
};

export default Footer;
