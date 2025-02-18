import { NextResponse } from "next/server";

import { fetcher } from "@/lib/actions/hooks/useFetcher";
import { ENV_VAR, getEnvVar } from "@/lib/getEnvVar";

const baseURL = getEnvVar(ENV_VAR.API_URL);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const config = searchParams.get("config");

  if (!url) {
    return NextResponse.json({ error: 'Missing "url" parameter' }, { status: 400 });
  }

  try {
    const data = await fetcher(baseURL + url, undefined, config ? JSON.parse(config) : undefined);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET fetcher:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { url, payload, config } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'Missing "url" parameter' }, { status: 400 });
    }

    const data = await fetcher(baseURL + url, payload, config);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in POST fetcher:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { url, payload, config } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'Missing "url" parameter' }, { status: 400 });
    }

    const data = await fetcher(baseURL + url, payload, {
      ...config,
      method: "PUT",
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in PUT fetcher:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { url, config } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'Missing "url" parameter' }, { status: 400 });
    }

    const data = await fetcher(baseURL + url, undefined, {
      ...config,
      method: "DELETE",
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in DELETE fetcher:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
