import {ProjectData} from '../schema/Project' 
import {TaskData} from '../schema/Task' 
import { MovieData } from '../schema/movie';


export const projects: ProjectData[] = [
    { id: 1, name: "Learn React Native" },
    { id: 2, name: "Workout" },
    { id: 3, name: "Workout" },
    { id: 3, name: "Workout" },
    { id: 3, name: "Workout" },
    { id: 3, name: "Workout" },
    { id: 3, name: "Workout" },
    { id: 2, name: "Workout" },
  ];

export const tasks: TaskData[] = [
{ id: 1, title: "Install Node", completed: true, project_id: 1 },
{ id: 2, title: "Install React Native CLI:", completed: false, project_id: 1},
{ id: 3, title: "Install Xcode", completed: false, project_id: 1 },
{ id: 4, title: "Morning Jog", completed: true, project_id: 2 },
{ id: 5, title: "Visit the gym", completed: false, project_id: 2 },
];

export const movie : MovieData[] = [ { rank: '1', movieNm: '라이온 킹', openDt: '2019-07-17' },
{ rank: '2', movieNm: '나랏말싸미', openDt: '2019-07-24' },
{ rank: '3', movieNm: '알라딘', openDt: '2019-05-23' },
{ rank: '4', movieNm: '스파이더맨: 파 프롬 홈', openDt: '2019-07-02' },
{ rank: '5', movieNm: '레드슈즈', openDt: '2019-07-25' },
{ rank: '6', movieNm: '명탐정 코난: 감청의 권', openDt: '2019-07-24' },
{ rank: '7', movieNm: '롱 샷', openDt: '2019-07-24' },
{ rank: '8', movieNm: '토이 스토리 4', openDt: '2019-06-20' },
{ rank: '9', movieNm: '기생충', openDt: '2019-05-30' },
{ rank: '10', movieNm: '사자', openDt: '2019-07-31' } ]