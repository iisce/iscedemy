export const COURSE_PRICING = {
    CRASH_COURSE: {
        virtualPrice: 30000, // ₦30,000
        physicalPrice: 50000, // ₦50,000
    },
    THREE_MONTHS: {
        virtualPrice: 300000, // ₦320,000
        physicalPrice: 300000, // ₦300,000
    },
    SIX_MONTHS: {
        virtualPrice: 500000, // ₦520,000
        physicalPrice: 500000, // ₦500,000
    },
}
export type ProgramType = "CRASH_COURSE" | "THREE_MONTHS" | "SIX_MONTHS";