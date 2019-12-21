import LetterModel, { ILetterModel } from './model';


export interface ILetterService {
    createLetter(data : ILetterModel) : Promise<ILetterModel>
}
