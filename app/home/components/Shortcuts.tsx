"use client";
import { useCallback } from "react";
import {
  PiCodeLight,
  PiFileTextLight,
  PiGithubLogoLight,
} from "react-icons/pi";

import { Shortcut } from "../../components/Shortcut";

export const ResumeShortcut = () => {
  return (
    <Shortcut icon={<PiFileTextLight />} label="Resume" />
  );
};

export const GitHubShortcut = () => {
  const handleClick = useCallback(() => {
    window.location.href = "https://github.com/Jaewoook";
  }, []);

  return (
    <Shortcut
      icon={<PiGithubLogoLight />}
      label="GitHub"
      initialY="120px"
      onClick={handleClick}
    />
  );
};

export const BlogShortcut = () => {
  const handleClick = useCallback(() => {
    window.location.href = "https://jaewook.me";
    console.log("Clicked");
  }, []);

  return (
    <Shortcut
      icon={<PiCodeLight />}
      label="Blog"
      initialY="240px"
      onClick={handleClick}
    />
  );
};
