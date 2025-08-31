export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const todos: Todo[] = [
  { id: 1, text: 'React 공부하기', completed: false },
  { id: 2, text: 'TypeScript 배우기', completed: true },
  { id: 3, text: '프로젝트 만들기', completed: false },
  { id: 4, text: '코드 리뷰하기', completed: false },
];
