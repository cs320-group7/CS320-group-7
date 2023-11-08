import { CheckboxGroup } from "@nextui-org/react";

export default function Page(data: string[]) {
  return (
    <CheckboxGroup>
      {data.map((e) => (
        <div>hi</div>
      ))}
    </CheckboxGroup>
  );
}
