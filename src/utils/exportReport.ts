import { ChatMessage, UserProfile } from '@/types/chat';

export function formatChatReportText(messages: ChatMessage[], profile?: UserProfile | null): string {
  const dateStr = new Date().toLocaleString();
  const userName = profile?.name || 'Anonymous';
  const userId = profile?.id || 'N/A';

  const header = `=====================================================
BILLY CYBERBULLYING PREVENTION PLATFORM - INCIDENT REPORT
Generated: ${dateStr}
User: ${userName} (ID: ${userId})
Confidential & For Safety Review
=====================================================

--- CHAT TRANSCRIPT ---
`;

  const body = messages
    .map((msg) => {
      const time = msg.timestamp.toLocaleTimeString();
      const sender = msg.role === 'assistant' ? 'Billy (AI Support)' : userName;
      const distressInfo = msg.sentimentScore ? ` [Distress Index: ${msg.sentimentScore}/10]` : '';
      const imageInfo = msg.imageUrl ? ' [Attached Evidence Image]' : '';
      return `[${time}] ${sender}${distressInfo}${imageInfo}:\n${msg.content}\n`;
    })
    .join('\n');

  const footer = `
--- END OF TRANSCRIPT ---

EMERGENCY HELPLINES:
- Crisis Text Line: Text HOME to 741741
- Suicide & Crisis Lifeline: Call or Text 988
- Cyber Crime Portal (India): Call 1930 / cybercrime.gov.in
- Emergency Police / Ambulance: 911 / 112
`;

  return header + body + footer;
}

export function downloadChatReport(messages: ChatMessage[], profile?: UserProfile | null): void {
  if (!messages || messages.length === 0) return;

  const content = formatChatReportText(messages, profile);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `billy-cyberbullying-report-${timestamp}.txt`;

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

