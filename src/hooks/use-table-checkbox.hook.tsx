import { useState } from 'react';

export function useTableCheckbox<TData extends any[]>(data: TData) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleResetSelected = () => {
    setSelected([]);
  };

  const handleAllCheckboxToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      const selectedArr = data.map((item) => item.id);
      setSelected(selectedArr || []);
      return;
    }
    setSelected([]);
  };

  const handleAllInterminateValue = () => {
    const selectedLen = selected.length;
    const dataLen = data.length || 0;
    return selectedLen > 0 && selectedLen < dataLen;
  };

  const handleAllCheckboxValue = () => {
    const selectedLen = selected.length;
    const dataLen = data.length || 0;
    return dataLen > 0 && selectedLen === dataLen;
  };

  const handleCheckboxToggle = (id: string) => {
    const idx = selected.indexOf(id);
    if (idx >= 0) {
      const newSelected = [
        ...selected.slice(0, idx),
        ...selected.slice(idx + 1),
      ];
      setSelected(newSelected);
      return;
    }
    setSelected((prev) => [...prev, id]);
  };

  const handleCheckboxValue = (id: string) => {
    const idx = selected.indexOf(id);
    return idx >= 0;
  };

  return {
    selected,
    resetSelected: handleResetSelected,
    allCheckboxToggle: handleAllCheckboxToggle,
    allInterminateValue: handleAllInterminateValue,
    allCheckboxValue: handleAllCheckboxValue,
    checkboxToggle: handleCheckboxToggle,
    checkboxValue: handleCheckboxValue,
  };
}
