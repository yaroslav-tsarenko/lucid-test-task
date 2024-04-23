import create from 'zustand'

type FormulaContainer = {
    name: string;
    description: string;
};

type State = {
    formulaContainers: FormulaContainer[];
    addFormulaContainer: (newContainer: FormulaContainer) => void;
    setFormulaContainers: (newContainers: FormulaContainer[]) => void;
};

export const useStore = create<State>((set) => ({
    formulaContainers: JSON.parse(localStorage.getItem('formulaContainers') || '[]'),
    addFormulaContainer: (newContainer: FormulaContainer) => set((state) => {
        const newFormulaContainers = [...state.formulaContainers, newContainer];
        localStorage.setItem('formulaContainers', JSON.stringify(newFormulaContainers));
        return { formulaContainers: newFormulaContainers };
    }),
    setFormulaContainers: (newContainers: FormulaContainer[]) => set(() => {
        localStorage.setItem('formulaContainers', JSON.stringify(newContainers));
        return { formulaContainers: newContainers };
    }),
}));