import LetterService from './service'
import {ILetterModel} from './model'

export async function createLetter(data : ILetterModel): Promise < ILetterModel > {
    return await LetterService.createLetter(data);
}