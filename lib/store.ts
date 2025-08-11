import { create } from 'zustand'

type RightRailTab = 'properties' | 'receipts' | 'comments' | 'versions' | 'approvals'

type UiState = {
  selectedBlockId: string | null
  setSelectedBlockId: (id: string | null) => void
  rightRailTab: RightRailTab
  setRightRailTab: (tab: RightRailTab) => void
}

export const useUiStore = create<UiState>((set) => ({
  selectedBlockId: null,
  setSelectedBlockId: (id) => set({ selectedBlockId: id }),
  rightRailTab: 'properties',
  setRightRailTab: (rightRailTab) => set({ rightRailTab }),
}))



