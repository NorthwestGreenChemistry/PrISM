// @flow

export const CURRENT_STEP = 'CURRENT_STEP';


export function openFile() {
	return;
}

export function saveFile() {
    return;
}

export function saveFileAs() {
    return;
}

export function exportAsPDF() {
    return;
}

export function openStep() {
    return {
        type: CURRENT_STEP,
        step
    };
}
