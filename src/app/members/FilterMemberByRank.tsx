import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { useMemberStore } from '@/src/store';
import { jost } from '@/src/utils/font';

export default function FilterMemberByRank() {
  const setFilterMembers = useMemberStore((state) => state.setFilterMembers);

  const items: { value: number; label: string }[] = [
    { value: -1, label: 'Tous' },
    { value: 0, label: "Grand livre d'Or" },
    { value: 2, label: "Petit livre d'Or" },
    { value: 3, label: "Petit livre d'Or" },
    { value: 4, label: "Reliure d'Or" },
    { value: 5, label: 'Edition Collector' },
    { value: 6, label: 'Livre de poche' },
    { value: 7, label: 'PU' },
    { value: 8, label: 'Rerool' },
    { value: 9, label: 'Polar' },
  ];

  function handleRoleChange(value: string) {
    setFilterMembers(Number(value));
  }
  return (
    <div className="md:w-56">
      <Select onValueChange={handleRoleChange}>
        <SelectTrigger className="bg-gray-300">
          <SelectValue placeholder="Tous" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem
                className={`${jost.className}`}
                key={item.value}
                value={item.value.toString()}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
