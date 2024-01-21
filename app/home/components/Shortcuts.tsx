"use client";
import Image from "next/image";
import { useCallback, useContext } from "react";

import { Shortcut } from "../../components/Shortcut";
import { LayerContext } from "../../contexts/LayerContext";

export const ProfileShortcut = () => {
  const { addLayer } = useContext(LayerContext);
  const handleClick = useCallback(() => {
    addLayer("window-Profile");
  }, [addLayer]);

  return (
    <Shortcut
      icon={<Image width={72} height={72} src="/images/icons/icon-profile.png" alt="profile icon" />}
      label="Profile"
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
      initialY="120px"
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
      initialY="240px"
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
      initialY="360px"
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
      initialY="480px"
      onClick={handleClick}
    />
  );
};
