import { delay, http, HttpResponse } from 'msw'

import { toMswApiUrl } from '@/apis/apiPath'
import { AUTH_ENDPOINTS } from '@/apis/auth'

export const DUPLICATED_NICKNAMES = ['운동왕', '헬스마니아', 'test', 'admin']
export const DUPLICATED_EMAILS = [
  'test@example.com',
  'admin@example.com',
  'test@test.com',
]
const EMAIL_VERIFICATION_CODE = '123456'
const EMAIL_TOKEN_EXPIRES_MS = 15 * 60 * 1000
const emailTokenStore = new Map<
  string,
  {
    email: string
    expiresAt: number
    used: boolean
  }
>()

const createEmailToken = () => `mock-email-token-${crypto.randomUUID()}`
const normalizeEmail = (email: string) => email.trim().toLowerCase()

export const signupHandler = [
  http.post(toMswApiUrl(AUTH_ENDPOINTS.signup), async ({ request }) => {
    const { password, nickname, email_token } = (await request.json()) as {
      password?: string
      nickname?: string
      email_token?: string
    }

    // 로딩 UI 확인용 지연입니다. 실제 API 연결 시 제거하거나 줄이면 됩니다.
    await delay(1000)

    const fieldErrors: Record<string, string[]> = {}

    if (!password || password.length < 8) {
      fieldErrors.password = ['비밀번호는 8자 이상이어야 합니다.']
    }

    if (!nickname) {
      fieldErrors.nickname = ['닉네임을 입력해주세요']
    }

    const emailToken = email_token ? emailTokenStore.get(email_token) : null

    // email_token은 인증번호 확인 성공 시 발급되는 1회성 토큰입니다.
    if (!email_token || !emailToken) {
      fieldErrors.email_token = ['이메일 인증을 완료해주세요.']
    } else if (emailToken.used) {
      fieldErrors.email_token = ['이미 사용된 이메일 인증입니다.']
    } else if (Date.now() > emailToken.expiresAt) {
      fieldErrors.email_token = ['이메일 인증 시간이 만료되었습니다.']
    }

    if (Object.keys(fieldErrors).length > 0) {
      return HttpResponse.json({ error_detail: fieldErrors }, { status: 400 })
    }

    const conflictErrors: Record<string, string[]> = {}

    // 이메일은 대소문자나 앞뒤 공백 차이로 중복 체크가 빠지지 않도록 정규화해서 비교합니다.
    if (DUPLICATED_EMAILS.includes(normalizeEmail(emailToken!.email))) {
      conflictErrors.email = ['이미 가입된 이메일입니다.']
    }

    if (DUPLICATED_NICKNAMES.includes(nickname!)) {
      conflictErrors.nickname = ['이미 사용 중인 닉네임입니다.']
    }

    if (Object.keys(conflictErrors).length > 0) {
      return HttpResponse.json(
        {
          error_detail: conflictErrors,
        },
        { status: 409 }
      )
    }

    // 회원가입 성공 시 email_token을 사용 처리해 재사용을 막습니다.
    emailToken!.used = true
    DUPLICATED_NICKNAMES.push(nickname!)
    DUPLICATED_EMAILS.push(normalizeEmail(emailToken!.email))

    return HttpResponse.json(
      {
        detail: '회원가입이 완료되었습니다.',
      },
      { status: 201 }
    )
  }),

  http.post(
    toMswApiUrl(AUTH_ENDPOINTS.sendEmailVerification),
    async ({ request }) => {
      const { email } = (await request.json()) as { email?: string }
      const normalizedEmail = email ? normalizeEmail(email) : ''

      // 로딩 UI 확인용 지연입니다. 실제 API 연결 시 제거하거나 줄이면 됩니다.
      await delay(1000)

      if (!normalizedEmail) {
        return HttpResponse.json(
          {
            error_detail: {
              email: ['이 필드는 필수 항목입니다.'],
            },
          },
          { status: 400 }
        )
      }

      // 이미 가입된 이메일이면 인증번호를 보내지 않고 이메일 필드 에러를 내려줍니다.
      if (DUPLICATED_EMAILS.includes(normalizedEmail)) {
        return HttpResponse.json(
          {
            error_detail: {
              email: ['이미 가입된 이메일입니다.'],
            },
          },
          { status: 409 }
        )
      }

      // MSW에서는 123456을 인증번호로 사용합니다.
      return HttpResponse.json({
        detail: '이메일 인증 코드가 전송되었습니다.',
      })
    }
  ),

  http.get(toMswApiUrl(AUTH_ENDPOINTS.verifyEmail), async ({ request }) => {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')?.trim()
    const code = searchParams.get('code')?.trim()

    // 로딩 UI 확인용 지연입니다. 실제 API 연결 시 제거하거나 줄이면 됩니다.
    await delay(1000)

    if (!email || !code) {
      return HttpResponse.json(
        {
          error_detail: {
            email: !email ? ['이 필드는 필수 항목입니다.'] : [],
            code: !code ? ['이 필드는 필수 항목입니다.'] : [],
          },
        },
        { status: 400 }
      )
    }

    if (code !== EMAIL_VERIFICATION_CODE) {
      return HttpResponse.json(
        {
          error_detail: {
            code: ['인증번호를 다시 확인해주세요.'],
          },
        },
        { status: 400 }
      )
    }

    const emailToken = createEmailToken()

    // 인증 성공 시 발급된 email_token은 이메일 정보를 품고 회원가입에서 1회만 사용할 수 있습니다.
    emailTokenStore.set(emailToken, {
      email: normalizeEmail(email),
      expiresAt: Date.now() + EMAIL_TOKEN_EXPIRES_MS,
      used: false,
    })

    return HttpResponse.json({
      detail: '이메일 인증이 완료되었습니다.',
      email_token: emailToken,
    })
  }),

  http.get(toMswApiUrl(AUTH_ENDPOINTS.checkNickname), async ({ request }) => {
    const { searchParams } = new URL(request.url)
    const nickname = searchParams.get('nickname')?.trim()

    // 로딩 UI 확인용 지연입니다. 실제 API 연결 시 제거하거나 줄이면 됩니다.
    await delay(3000)

    // 닉네임이 비어 있으면 실제 API 명세처럼 400 필드 에러를 내려줍니다.
    if (!nickname) {
      return HttpResponse.json(
        {
          error_detail: {
            nickname: ['이 필드는 필수 항목입니다.'],
          },
        },
        { status: 400 }
      )
    }

    // 지금은 MSW 임시 데이터에 포함된 닉네임만 중복으로 처리합니다.
    if (DUPLICATED_NICKNAMES.includes(nickname)) {
      return HttpResponse.json(
        {
          error_detail: {
            nickname: ['중복된 닉네임입니다.'],
          },
        },
        { status: 409 }
      )
    }

    // 중복 목록에 없으면 사용 가능한 닉네임으로 응답합니다.
    return HttpResponse.json({
      detail: '사용가능한 닉네임입니다.',
    })
  }),
]
