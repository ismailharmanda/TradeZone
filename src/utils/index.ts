import {AnyAction} from 'redux';

export interface IGenericAction {
  <T extends {type?: any; payload?: any}>({type, payload}: T): AnyAction;
}

export const GenericActionCreator: IGenericAction = ({
  type,
  payload,
}): AnyAction => ({
  type,
  payload,
});
