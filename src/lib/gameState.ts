import { useReducer } from "react";

export type GameState = {
  snake: Array<{ x: number; y: number }>;
  food: { x: number; y: number };
  direction: "UP" | "DOWN" | "LEFT" | "RIGHT";
  score: number;
  gameOver: boolean;
  speed: number;
};

export type GameAction =
  | { type: "MOVE_SNAKE" }
  | { type: "CHANGE_DIRECTION"; direction: GameState["direction"] }
  | { type: "SPAWN_FOOD" }
  | { type: "INCREASE_SCORE"; points: number }
  | { type: "RESET_GAME" };

const initialGameState: GameState = {
  snake: [{ x: 10, y: 10 }],
  food: { x: 5, y: 5 },
  direction: "RIGHT",
  score: 0,
  gameOver: false,
  speed: 1.15,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "MOVE_SNAKE":
      return moveSnake(state);
    case "CHANGE_DIRECTION":
      return { ...state, direction: action.direction };
    case "SPAWN_FOOD":
      return spawnFood(state);
    case "INCREASE_SCORE":
      return { ...state, score: state.score + action.points };
    case "RESET_GAME":
      return { ...initialGameState };
    default:
      return state;
  }
}

function moveSnake(state: GameState): GameState {
  // Basic movement logic to be enhanced later
  const head = { ...state.snake[0] };
  switch (state.direction) {
    case "UP":
      head.y -= 1;
      break;
    case "DOWN":
      head.y += 1;
      break;
    case "LEFT":
      head.x -= 1;
      break;
    case "RIGHT":
      head.x += 1;
      break;
  }
  
  return {
    ...state,
    snake: [head, ...state.snake.slice(0, -1)],
  };
}

function spawnFood(state: GameState): GameState {
  // Basic food spawning to be enhanced later
  return {
    ...state,
    food: {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    },
  };
}
