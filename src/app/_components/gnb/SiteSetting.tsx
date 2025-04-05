import { Button } from '@/design-system/Button'
import { Tabs, TabsList, TabsTrigger } from '@/design-system/Tabs'
import Typography from '@/design-system/Typography'
import { ArrowRightIcon } from '@/design-system/icons/ArrowRight'
import { MoonIcon } from '@/design-system/icons/Moon'
import { SunIcon } from '@/design-system/icons/Sun'

const TabsTriggerClass =
	'w-16 h-8 py-2 px-3 rounded-full data-[state=active]:bg-[#2222220d] cursor-pointer hover:data-[state=active]:bg-[#22222214] active:data-[state=active]:bg-[#22222217] !shadow-none'

export function SiteSetting() {
	return (
		<section className="border-surface2 rounded-2xl border-[1px] border-solid py-3 pr-1 pl-4">
			<div>
				<div className="py-2">
					<Typography size={18}>글로벌 선호도</Typography>
				</div>

				<section className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<Typography size={16} textColor="neutral2">
							테마
						</Typography>
						<Tabs defaultValue="auto">
							<TabsList className="border-surface3 h-10 gap-3 rounded-full border-[1px] border-solid bg-white p-1">
								<TabsTrigger value="auto" className={TabsTriggerClass}>
									<Typography weight="bold">자동</Typography>
								</TabsTrigger>
								<TabsTrigger value="light" className={TabsTriggerClass}>
									<SunIcon className="text-neutral1" />
								</TabsTrigger>
								<TabsTrigger value="dark" className={TabsTriggerClass}>
									<MoonIcon className="text-neutral1" />
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>

					<div className="flex items-center justify-between">
						<Typography size={16} textColor="neutral2">
							언어
						</Typography>
						<Button
							variant="transparent"
							className="h-auto p-0 text-[16px] font-bold"
						>
							한국어
							<ArrowRightIcon style={{ width: '24px', height: '24px' }} />
						</Button>
					</div>

					<div className="flex items-center justify-between">
						<Typography size={16} textColor="neutral2">
							통화
						</Typography>
						<Button
							variant="transparent"
							className="h-auto p-0 text-[16px] font-bold"
						>
							USD
							<ArrowRightIcon style={{ width: '24px', height: '24px' }} />
						</Button>
					</div>
				</section>
			</div>
		</section>
	)
}
