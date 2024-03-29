"use client";
import Image from "next/image";
import { useCallback, useContext } from "react";

import { LayerContext } from "../contexts/LayerContext";
import { Shortcut } from "./Shortcut";

export const ProfileShortcut = () => {
  const { addLayer } = useContext(LayerContext);
  const handleClick = useCallback(() => {
    addLayer("window-Profile");
  }, [addLayer]);

  return (
    <Shortcut
      icon={<Image width={72} height={72} src="/images/icons/icon-profile.png" alt="profile icon" />}
      label="Profile"
      initialX="24px"
      initialY="40px"
      onClick={handleClick}
    />
  );
};

export const ResumeShortcut = () => {
  const { addLayer } = useContext(LayerContext);
  const handleClick = useCallback(() => {
    addLayer("window-Resume");
  }, [addLayer]);

  return (
    <Shortcut
      icon={<Image width={72} height={72} src="/images/icons/icon-resume.png" alt="resume icon" />}
      label="Resume"
      initialX="24px"
      initialY="160px"
      onClick={handleClick}
    />
  );
};

export const SettingsShortcut = () => {
  const { addLayer } = useContext(LayerContext);
  const handleClick = useCallback(() => {
    addLayer("window-Settings");
  }, [addLayer]);

  return (
    <Shortcut
      icon={<Image width={72} height={72} src="/images/icons/icon-settings.png" alt="settings icon" />}
      label="Settings"
      initialX="24px"
      initialY="280px"
      onClick={handleClick}
    />
  );
};

export const GitHubShortcut = () => {
  const handleClick = useCallback(() => {
    window.location.href = "https://github.com/Jaewoook";
  }, []);

  return (
    <Shortcut
      icon={<Image width={72} height={72} src="/images/icons/icon-github.png" alt="github icon" />}
      label="GitHub"
      initialX="24px"
      initialY="400px"
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
      icon={<Image width={72} height={72} src="/images/icons/icon-blog.png" alt="blog icon" />}
      label="Blog"
      initialX="24px"
      initialY="520px"
      onClick={handleClick}
    />
  );
};
