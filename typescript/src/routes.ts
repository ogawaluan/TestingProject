import { Request, Response } from 'express';
import CreateUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  const user = CreateUser({
    email: 'ogawa.luan@gmail.com',
    password: '1234',
    techs: [
      'Nodejs', 
      'React-Native', 
      'Typescript',
      { title: 'Javascript', experience: 100 }
    ]
  });
  
  return response.json({ message: "Hello World"})
}