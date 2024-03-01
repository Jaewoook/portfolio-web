
declare global {
  interface Battery {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
  }

  interface Navigator extends globalThis.Navigator {
    getBattery?: () => Promise<Battery>;
  }
}

export { Battery };
