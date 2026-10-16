import test from "node:test"
import assert from "node:assert/strict"
import { applyRepoSystemPrompt } from "../lib/repo-context.mjs"

const PROMPT = "## OpenViking - Indexed Code Repositories"

test("merges into the existing system entry without adding a block", () => {
  const output = { system: ["BASE"] }
  assert.equal(applyRepoSystemPrompt(output, PROMPT), true)
  assert.deepEqual(output.system, [`BASE\n\n${PROMPT}`])
})

test("pushes when the system array is empty", () => {
  const output = { system: [] }
  applyRepoSystemPrompt(output, PROMPT)
  assert.deepEqual(output.system, [PROMPT])
})

test("does not prepend blank lines to an empty last entry", () => {
  const output = { system: [""] }
  applyRepoSystemPrompt(output, PROMPT)
  assert.deepEqual(output.system, [PROMPT])
})

test("is a no-op without a prompt or system array", () => {
  const output = { system: ["BASE"] }
  assert.equal(applyRepoSystemPrompt(output, null), false)
  assert.deepEqual(output.system, ["BASE"])
  assert.equal(applyRepoSystemPrompt({}, PROMPT), false)
  assert.equal(applyRepoSystemPrompt(undefined, PROMPT), false)
})
