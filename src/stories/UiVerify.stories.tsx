import type { Meta, StoryObj } from "@storybook/react"
import { UiVerify } from "@/components/verification/UiVerify"

const meta: Meta<typeof UiVerify> = {
  title: "Verification/UiVerify",
  component: UiVerify,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof UiVerify>

export const Default: Story = {}
