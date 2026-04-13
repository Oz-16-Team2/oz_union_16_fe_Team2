import { DarklogoImage } from '@/assets/images'
import { FOOTER } from '@/constants/footer'

/**
 * TODO: Footer 디자인 임시 구현
 * - 현재는 기본 레이아웃만 구성된 상태
 */

export default function Footer() {
  return (
    <footer className="bg-gray-950 py-14 border-t border-t-[#202020]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
        <img src={DarklogoImage} className="w-14" alt="OZ Union 로고" />
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-500">GitHub</span>
          <div className="flex items-center gap-3">
            {FOOTER.githubLinks.map(({ href, label, text }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-gray-400 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-105"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 19 19"
                  aria-hidden="true"
                  fill="none"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{text}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
