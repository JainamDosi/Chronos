export const getMonday = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const result = new Date(d.setDate(diff));
    result.setHours(0, 0, 0, 0);
    return result;
};

export const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};
