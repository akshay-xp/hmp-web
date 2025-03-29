import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/_admin/moderation')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_private/_admin/moderation"!</div>
}
