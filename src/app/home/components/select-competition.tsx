import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

type SelectProps = {
  competition: Competition | undefined;
  value: string;
  onChange: (v: string) => void;
}

const SelectCompetition = ({ competition, onChange, value }: SelectProps) => {
  return (
    <div className="w-[140px]">

    <Select onValueChange={onChange} defaultValue={value}>
            <SelectTrigger>
              <SelectValue placeholder="select a team" />
            </SelectTrigger>

            <SelectContent>
              {competition?.children.map((comp) => (
                <SelectItem key={comp.id} value={comp.id}>
                  {comp.competition_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
    </div>
  )
}

export default SelectCompetition