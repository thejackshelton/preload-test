import { component$ } from "@qwik.dev/core";
import type { DocumentHead } from "@qwik.dev/router";
import { Dropdown } from "@qwik-ui/headless";

export default component$(() => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>Git Settings</Dropdown.Trigger>
      <Dropdown.Popover gutter={8}>
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Item>Item 2</Dropdown.Item>
        <Dropdown.Item>Item 3</Dropdown.Item>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
