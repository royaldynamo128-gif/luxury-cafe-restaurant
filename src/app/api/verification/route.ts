import { NextResponse } from "next/server"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { getTableColumns } from "drizzle-orm"
import { initTRPC } from "@trpc/server"
import { create, insert, search } from "@orama/orama"
import sharp from "sharp"
import { render } from "@react-email/components"
import * as React from "react"
import { betterAuth } from "better-auth"

// 1. Drizzle ORM Schema test
const usersTable = sqliteTable("users_test", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
})

// 2. React Email template test
function MockEmail() {
  return React.createElement("div", null, "Hello from React Email Verification!")
}

export async function GET() {
  const report: Record<string, { status: "PASS" | "FAIL"; details?: string; error?: string }> = {}

  // 1. Drizzle ORM Test
  try {
    const columns = getTableColumns(usersTable)
    if (columns.id && columns.name) {
      report["Drizzle ORM"] = { status: "PASS", details: "Schema compiling and column mapping works" }
    } else {
      throw new Error("Failed to map schema columns")
    }
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err)
    report["Drizzle ORM"] = { status: "FAIL", error: errMsg }
  }

  // 2. tRPC Server Test
  try {
    const t = initTRPC.create()
    const appRouter = t.router({
      verify: t.procedure.query(() => ({ ok: true, msg: "tRPC server functional" })),
    })
    const caller = appRouter.createCaller({})
    const result = await caller.verify()
    if (result.ok) {
      report["tRPC"] = { status: "PASS", details: "In-memory query caller successful" }
    } else {
      throw new Error("tRPC query returned unexpected result")
    }
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err)
    report["tRPC"] = { status: "FAIL", error: errMsg }
  }

  // 3. Orama Search Test
  try {
    const db = await create({
      schema: {
        name: "string",
        category: "string",
      },
    })
    await insert(db, { name: "Orama Search Engine", category: "Verification" })
    const results = await search(db, { term: "Orama" })
    if (results.count > 0) {
      report["Orama"] = { status: "PASS", details: `Indexed and successfully searched document (found ${results.count})` }
    } else {
      throw new Error("No documents found in index")
    }
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err)
    report["Orama"] = { status: "FAIL", error: errMsg }
  }

  // 4. Sharp Image processing
  try {
    // Generate a simple 10x10 green PNG image in memory
    const imageBuffer = await sharp({
      create: {
        width: 10,
        height: 10,
        channels: 4,
        background: { r: 0, g: 255, b: 0, alpha: 1 },
      },
    })
      .png()
      .toBuffer()

    const metadata = await sharp(imageBuffer).metadata()
    if (metadata.width === 10 && metadata.format === "png") {
      report["Sharp"] = { status: "PASS", details: "10x10 image created and metadata read successfully" }
    } else {
      throw new Error("Image metadata verification failed")
    }
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err)
    report["Sharp"] = { status: "FAIL", error: errMsg }
  }

  // 5. React Email rendering
  try {
    const html = await render(React.createElement(MockEmail))
    if (html.includes("React Email Verification")) {
      report["React Email"] = { status: "PASS", details: "React component rendered to HTML string successfully" }
    } else {
      throw new Error("HTML string missing expected text")
    }
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err)
    report["React Email"] = { status: "FAIL", error: errMsg }
  }

  // 6. Better Auth init check
  try {
    const auth = betterAuth({
      // We pass a mock/temporary secret and options to verify instantiating the class works
      secret: "VERIFICATION_SECRET_1234567890123456",
      database: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        db: {} as any, // Mock database object
        type: "sqlite",
      },
    })
    if (auth && typeof auth.handler === "function") {
      report["Better Auth"] = { status: "PASS", details: "Auth instance created with route handlers" }
    } else {
      throw new Error("Auth instance or handler undefined")
    }
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err)
    report["Better Auth"] = { status: "FAIL", error: errMsg }
  }

  return NextResponse.json(report)
}
