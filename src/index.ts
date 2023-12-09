import keyBy from 'lodash/keyBy';
import { SelectColumnRenderer } from './renderer';
import { SelectConfig } from './type';
import { SelectColumnEditor } from './editor';
import * as loader from 'revo-dropdown/loader';


export default class SelectColumnType {
    constructor() {
        this.loadCustomComponent();
    }
    readonly editor = SelectColumnEditor;

    beforeSetup = (col: SelectConfig) => {
        if (!col.source) {
            return;
        }
        col.sourceLookup = keyBy(col.source, col.valueKey);
    };

    cellTemplate = SelectColumnRenderer;

    private loadCustomComponent() {
        if (loader?.defineCustomElements) {
            loader?.defineCustomElements();
        }
    }
}
export const CreateSelectColumnType = SelectColumnType;
