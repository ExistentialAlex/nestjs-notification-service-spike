import { INotificationToSend } from '../interfaces/notification-to-send.interface';
import { IUnsentNotification } from '../interfaces/unsent-notifications.interface';
import { INotificationBuilder } from '../interfaces/notification-builder.interface';
import { getAttachment, getTemplate } from '../helpers/files.helper';
import { IAttachment } from '../interfaces/attachment.interface';

export class EmailNotificationBuilder implements INotificationBuilder {
  buildNotification(
    unsentNotification: IUnsentNotification,
  ): INotificationToSend {
    // get the message header template
    let messageHeader = getTemplate(unsentNotification.HeaderTemplate);
    let messageBody = getTemplate(unsentNotification.BodyTemplate);
    let alternativeMessageBody = '';

    if (unsentNotification.AlternativeBodyTemplate) {
      alternativeMessageBody = getTemplate(
        unsentNotification.AlternativeBodyTemplate,
      );
    }

    // Get the static values.
    // Use '...' here to spread both the original values and the new ones incase of overrides
    unsentNotification.Values = {
      ...unsentNotification.Values,
      ...this.getStaticValues(unsentNotification),
    };

    // Value replacements
    for (const [key, value] of Object.entries(unsentNotification.Values)) {
      messageHeader = messageHeader.replace(`{{${key}}}`, value);
      messageBody = messageBody.replace(`{{${key}}}`, value);
      if (unsentNotification.AlternativeBodyTemplate) {
        alternativeMessageBody = alternativeMessageBody.replace(
          `{{${key}}}`,
          value,
        );
      }
    }

    const notificationToSend: INotificationToSend = {
      MessageHeader: messageHeader,
      MessageBody: messageBody,
      MessageBodyAlternative: alternativeMessageBody,
      DestinationAddress: unsentNotification.Destination,
      DestinationUserID: '',
    };

    return notificationToSend;
  }
  buildAttachment(attachmentName: string): IAttachment {
    return {
      filename: attachmentName,
      content: getAttachment(attachmentName),
    };
  }

  private getStaticValues(
    unsentNotification: IUnsentNotification,
  ): Record<string, string> {
    const values: Record<string, string> = {};

    // Get any values from app.config:
    values.WebsiteRootUrl = process.env.WebsiteRootUrl;
    values.IdServerRootUrl = process.env.IdServerRootUrl;

    // UserName replacements:
    if (unsentNotification.DestinationUserName) {
      values.UserName = unsentNotification.DestinationUserName;
    }

    // Footer replacements:
    values.Footer = getTemplate(process.env.FooterTemplateName);
    values.AlternativeFooter = getTemplate(
      process.env.AlternativeFooterTemplateName,
    );

    return values;
  }
}
