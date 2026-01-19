import { Container } from "@/components/layout/Container"
import { SectionWrapper } from "@/components/layout/SectionWrapper"

export default function Home() {
  return (
    <SectionWrapper>
      <Container>
        <div className="flex min-h-[60vh] items-center justify-center">
          <h1 className="text-balance text-6xl font-bold tracking-tight md:text-8xl">
            Hi
          </h1>
        </div>
      </Container>
    </SectionWrapper>
  )
}
