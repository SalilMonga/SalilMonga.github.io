export const SecondPage = () => {
  return (
    <div>
      <h3 className="py-1 text-2xl dark:text-white">About this project</h3>
      <p className="text-md text-gray-80 py-2 leading-8 dark:text-white">
        This portfolio website is designed to help me continue to
        <span className="text-purple-500 dark:text-pink-400"> learn</span> and
        <span className="text-purple-500  dark:text-pink-400">
          {" "}
          explore
        </span>{" "}
        new technology. My aim is to set this project like an actual project
        with a{" "}
        <a
          href="https://www.notion.so/a1a172ce497741f9a51a9becddf07aa5?v=018bd15eeead45558c6021bcc519301f"
          className="text-blue-500 hover:text-green-400"
          target="_blank"
        >
          Kanban
        </a>{" "}
        board and using best practices like github PRs. This is going to be an
        ongoing project with always evolving design and best practices. As of
        now, it is a private{" "}
        <a
          href="https://github.com/SalilMonga/my-portfolio"
          className="text-blue-500 hover:text-green-400"
          target="_blank"
        >
          Github
        </a>{" "}
        repo but soon it will be set to public for you to go in and help me
        develop this. Happy developing!
      </p>
    </div>
  );
};
