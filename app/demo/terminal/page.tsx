"use client";
import { useEffect, useState } from "react";
import { projects, roles } from "../_data";

const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };

function Caret() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn((v) => !v), 530);
    return () => clearInterval(t);
  }, []);
  return <span className={`inline-block w-[0.55em] h-[1em] align-[-0.15em] ml-0.5 ${on ? "bg-[#7CFF6B]" : "bg-transparent"}`} />;
}

const rule = "─".repeat(120);

export default function Terminal() {
  return (
    <main className="min-h-screen bg-black text-[#d9d9d9] p-4 md:p-10 text-[13px] md:text-[14px] leading-relaxed" style={mono}>
      <div className="max-w-5xl mx-auto">
        <pre className="text-[#7CFF6B] whitespace-pre-wrap leading-tight mb-6">{`  ___   ___  ___  _  _ ___ _____     _     ___ ___    _____      ___   _
 / _ \\ / __|/ __|| || |_ _|_   _|   /_\\   / __| _ \\  / /\\ \\    / /_\\ | |
|  _  | (__| (__ | __ || |  | |    / _ \\ | (_ |   / / /  \\ \\/\\/ / _ \\| |__
|_| |_|\\___|\\___||_||_|___| |_|   /_/ \\_\\ \\___|_|_\\/_/    \\_/\\_/_/ \\_\\____|`}</pre>

        <div className="text-neutral-500">{rule}</div>
        <p><span className="text-[#7CFF6B]">guest@archit</span>:<span className="text-sky-400">~</span>$ whoami<Caret/></p>
        <p className="pl-2 text-neutral-300">archit agrawal — staff engineer, ml infra &amp; retrieval.</p>
        <p className="pl-2 text-neutral-500">// builds tools that make llms dependable in production.</p>

        <div className="mt-8 text-neutral-500">{rule}</div>
        <p><span className="text-[#7CFF6B]">guest@archit</span>:<span className="text-sky-400">~</span>$ ls ./work --long</p>
        <table className="w-full mt-2">
          <tbody>
            {projects.map((p) => (
              <tr key={p.n} className="hover:bg-neutral-900/80 cursor-pointer group">
                <td className="py-1 pr-4 text-neutral-500">{p.n}</td>
                <td className="py-1 pr-4 text-neutral-500 tabular-nums">{p.year}</td>
                <td className="py-1 pr-4 text-[#7CFF6B] group-hover:underline">{p.title}</td>
                <td className="py-1 text-neutral-400">[{p.kind}]</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 text-neutral-500">{rule}</div>
        <p><span className="text-[#7CFF6B]">guest@archit</span>:<span className="text-sky-400">~</span>$ cat experience.log</p>
        <ul className="mt-2 space-y-1">
          {roles.map((r) => (
            <li key={r.yr} className="grid grid-cols-12 gap-2">
              <span className="col-span-3 text-neutral-500">{r.yr}</span>
              <span className="col-span-4 text-[#ffd86b]">{r.where}</span>
              <span className="col-span-5 text-neutral-400">// {r.what}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-neutral-500">{rule}</div>
        <p><span className="text-[#7CFF6B]">guest@archit</span>:<span className="text-sky-400">~</span>$ contact --open</p>
        <div className="pl-2 mt-1 space-y-0.5">
          <p><span className="text-neutral-500">mail </span><a href="mailto:admin@mysta.ge" className="text-[#7CFF6B] underline">admin@mysta.ge</a></p>
          <p><span className="text-neutral-500">git  </span><a className="text-[#7CFF6B] underline" href="#">github.com/archit</a></p>
          <p><span className="text-neutral-500">in   </span><a className="text-[#7CFF6B] underline" href="#">linkedin.com/in/archit</a></p>
        </div>

        <p className="mt-10"><span className="text-[#7CFF6B]">guest@archit</span>:<span className="text-sky-400">~</span>$ <Caret/></p>
        <p className="mt-10 text-neutral-600 text-xs">tip: press ⌘K to open the command palette.</p>
      </div>
    </main>
  );
}
