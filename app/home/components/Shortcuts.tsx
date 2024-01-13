"use client";
import { useCallback, useContext } from "react";
import {
  PiCodeLight,
  PiFileTextLight,
  PiGearLight,
  PiGithubLogoLight,
  PiUserLight,
} from "react-icons/pi";

import { Shortcut } from "../../components/Shortcut";
import { LayerContext } from "../../contexts/LayerContext";

export const ProfileShortcut = () => {
  const { addLayer } = useContext(LayerContext);
  const handleClick = useCallback(() => {
    addLayer("window-Profile");
  }, [addLayer]);

  return (
    <Shortcut icon={<PiUserLight />} label="Profile" onClick={handleClick} />
  );
};

export const ResumeShortcut = () => {
  const { addLayer } = useContext(LayerContext);
  const handleClick = useCallback(() => {
    addLayer("window-Resume");
  }, [addLayer]);

  return (
    <Shortcut icon={<PiFileTextLight />} label="Resume" initialY="120px" onClick={handleClick} />
  );
};

export const SettingsShortcut = () => {
  const { addLayer } = useContext(LayerContext);
  const handleClick = useCallback(() => {
    addLayer("window-Settings");
  }, [addLayer]);

  return (
    <Shortcut icon={<PiGearLight />} label="Settings" initialY="240px" onClick={handleClick} />
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
      icon={<PiCodeLight />}
      label="Blog"
      initialY="480px"
      onClick={handleClick}
    />
  );
};
