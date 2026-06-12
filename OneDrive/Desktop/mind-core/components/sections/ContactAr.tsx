"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { SectionHeader, Reveal } from "@/components/ui/primitives";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [focusField, setFocusField] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative px-6 pb-44 pt-40 md:pt-56">
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-[26rem] w-[120vw] -translate-x-1/2 translate-y-1/2 rounded-[100%] bg-core/15 blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="٠٦ · البداية"
          title={
            <>
              افتح جلسة
              <br />
              مع الاستوديو.
            </>
          }
          lede="ثلاثة أسئلة. نرد خلال يوم عمل واحد برأي، لا بسلسلة مبيعات."
          align="center"
        />

        <Reveal className="mx-auto mt-16 max-w-2xl">
          <div className="glass edge-light edge-sweep scanlines relative overflow-hidden rounded-3xl">
            <div aria-hidden className="tech-grid absolute inset-0 opacity-30" />

            <div className="relative z-10 flex items-center justify-between border-b border-hairline px-6 py-3.5">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-pulse/70 shadow-[0_0_8px_rgba(142,123,255,0.7)]" />
                <span className="h-3 w-3 rounded-full bg-core/70 shadow-[0_0_8px_rgba(94,139,255,0.7)]" />
                <span className="h-3 w-3 rounded-full bg-beam/70 shadow-[0_0_8px_rgba(156,194,255,0.7)]" />
                <span className="ml-2 font-mono text-[11px] text-mist">
                  mindcore://new-session
                </span>
              </span>
              <span className="font-mono text-[11px] text-mist/60">session 0x4D43</span>
            </div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 px-8 py-20 text-center"
                role="status"
              >
                <p className="display lit text-2xl font-semibold">تم فتح الجلسة.</p>
                <p className="mx-auto mt-3 max-w-line text-mist">
                  رسالتك مع الاستوديو. انتظر رداً خلال يوم عمل واحد.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="relative z-10 space-y-7 p-8 sm:p-10">
                <Field
                  id="name"
                  label="٠١ · من أنت؟"
                  placeholder="الاسم، الشركة"
                  focused={focusField === "name"}
                  onFocusChange={(f) => setFocusField(f ? "name" : null)}
                />
                <Field
                  id="email"
                  type="email"
                  label="٠٢ · أين نردّ؟"
                  placeholder="you@company.com"
                  focused={focusField === "email"}
                  onFocusChange={(f) => setFocusField(f ? "email" : null)}
                />
                <Field
                  id="vision"
                  label="٠٣ · ما الذي نبنيه؟"
                  placeholder="بضع جمل تكفي — سنسأل الأسئلة الصحيحة."
                  textarea
                  focused={focusField === "vision"}
                  onFocusChange={(f) => setFocusField(f ? "vision" : null)}
                />

                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-2xl bg-frost py-4 text-sm font-semibold text-void transition-transform duration-300 ease-glide active:scale-[0.99]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-core/30 to-transparent transition-transform duration-700 ease-glide group-hover:translate-x-full"
                  />
                  <span className="relative">افتح الجلسة ←</span>
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
  textarea = false,
  focused,
  onFocusChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
  focused: boolean;
  onFocusChange: (focused: boolean) => void;
}) {
  const shared =
    "w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-[15px] text-frost placeholder:text-mist/40 transition-colors duration-300 focus:outline-none text-right";
  const border = focused ? "border-beam/50" : "border-hairline";

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`label mb-2.5 block text-right transition-colors duration-300 ${
          focused ? "text-beam" : ""
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <motion.span
          aria-hidden
          animate={{ opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="absolute -inset-1 -z-10 rounded-2xl bg-core/15 blur-lg"
        />
        {textarea ? (
          <textarea
            id={id}
            name={id}
            required
            rows={4}
            placeholder={placeholder}
            onFocus={() => onFocusChange(true)}
            onBlur={() => onFocusChange(false)}
            className={`${shared} ${border} resize-none`}
          />
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            required
            placeholder={placeholder}
            onFocus={() => onFocusChange(true)}
            onBlur={() => onFocusChange(false)}
            className={`${shared} ${border}`}
          />
        )}
      </div>
    </div>
  );
}
