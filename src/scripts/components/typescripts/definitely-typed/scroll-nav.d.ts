declare namespace ScrollNavDef {
  interface TweenValues {
    _i: {val:number}; //Tween initialization
    _fe: number; //Final expression
    _speed: number; //Tween Speed
    _ease?: string // Tween ease
    _onStart?: () => void; //Function called when Tween starts
    _onUpdate: () => void; //Function called each Tween update
    _onComplete?: () => void; //Function called when Tween starts
  }

  interface SettableValues {
    ease: string;
    speed: number;
  }
}