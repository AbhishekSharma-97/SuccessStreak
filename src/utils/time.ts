import dayjs from "dayjs";

export const formatTo24 = (date: Date) => {
    return dayjs(date).format('HH:mm');
}

export const formatForDisplay = (time24Hr: string, zone?: string) => {
    const iso = `2000-01-01T${time24Hr}:00.000Z`;
    return dayjs.tz(iso, zone).format('h:mm A');
}

export const parseDisplayTo24 = (display: string): string => {
    return dayjs(display, "hh:mm A").format("HH:mm");
};

export const getDeviceTimezone = (): string => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
};