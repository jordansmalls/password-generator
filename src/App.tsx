import GithubCorner from "./components/github-corner";
import GeneratePasswordButton from "./components/generate-button";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <div className="mt-[11rem]">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div>
          <GithubCorner />
        </div>
        <main>
          <div className="mt-8 px-4 text-center flex flex-col justify-center sm:mt-16 lg:mt-[10rem]">
            <h1 className="text-4xl font-semibold text-pretty tracking-tight mb-2 sm:text-5xl md:text-6xl self-center max-w-3xl">
              Password Generator
            </h1>
            <p className="max-w-3xl text-base text-muted-foreground my-2 mb-4 self-center sm:text-lg md:text-xl">
              a minimal, privacy focused password generator that creates strong,
              high entropy passwords using modern security best practices. no
              storage, no tracking–just safe credentials on demand.
            </p>

            <p className="max-w-3xl text-base text-muted-foreground my-2 mb-4 self-center sm:text-lg md:text-xl">
              48 character passwords are generated entirely on your own machine,
              using the Web Crypto API. once you have a password, paste it in
              your password manager of choice. this tool is a static app, there
              is no server capable of receiving or storing passwords.
            </p>
          </div>

          {/* generate passwords */}
          <div className="flex justify-center">
            <GeneratePasswordButton />
          </div>

          {/* Footer */}
          <div className="mt-[10rem] flex justify-center">
            <Footer />
          </div>
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
