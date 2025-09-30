export default class HelperUtil {
    static convertRoleToUserRole(
        role: { label: string; value: string }[],
        userId: string
    ): { userId: string; roleId: string }[] {
        return role.map((r) => ({
            userId: userId,
            roleId: r.value,
        }));
    }
    static convertGroupToUserGroup(
        group: { label: string; value: string }[],
        userId: string
    ): { userId: string; groupId: string }[] {
        return group.map((g) => ({
            userId: userId,
            groupId: g.value,
        }));
    }
    static convertGroupToGroupEvent(
        group: { label: string; value: string }[],
        eventId: string
    ): { eventId: string; groupId: string }[] {
        return group.map((g) => ({
            eventId: eventId,
            groupId: g.value,
        }));
    }
    static convertEventToGroupEvent(
        event: { label: string; value: string }[],
        groupId: string
    ): { eventId: string; groupId: string }[] {
        return event.map((e) => ({
            eventId: e.value,
            groupId: groupId,
        }));
    }
    static convertCourseToProgramCourse(
        course: { label: string; value: string }[],
        programId: string
    ): { courseId: string; programId: string }[] {
        return course.map((e) => ({
            courseId: e.value,
            programId: programId,
        }));
    }
    static convertTryoutSectionToProgramTryoutSection(
        tryoutSection: { label: string; value: string }[],
        programId: string
    ): { tryoutSectionId: string; programId: string }[] {
        return tryoutSection.map((e) => ({
            tryoutSectionId: e.value,
            programId: programId,
        }));
    }
     static convertProgramToProgramTryoutSection(
        program: { label: string; value: string }[],
        tryoutSectionId: string
    ): { tryoutSectionId: string; programId: string }[] {
        return program.map((e) => ({
            programId: e.value,
            tryoutSectionId: tryoutSectionId,
        }));
    }
    static generateCodeFromTitle(title: string): string {
        return title
            .trim()
            .toUpperCase()
            .replace(/\s+/g, "_")
            .replace(/[^\w_]/g, "");
    }
    static convertTimestampToWIBDateTime(timestamp: number): string {
        const date = new Date(timestamp);
        return date.toLocaleString("id-ID", {
            timeZone: "Asia/Jakarta",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    }
    static capitalizeSentence(sentence: string): string {
        return sentence
            .split(" ")
            .map((word) => {
                if (word.length === 0) return "";
                return word[0]?.toUpperCase() + word?.slice(1)?.toLowerCase();
            })
            .join(" ");
    }
    static async runWithTransaction<T>(db: any, fn: (t: any) => Promise<T>): Promise<T> {
        const transaction = await db.sequelize.transaction();
        try {
            const result = await fn(transaction);
            await transaction.commit();
            return result;
        } catch (error: any) {
            await transaction.rollback();
            throw new Error(error.message);
        }
    }
}
