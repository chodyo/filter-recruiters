/*
  Guide: https://www.jessespevack.com/2018-09-06-how-to-create-a-gmail-filter-with-google-apps-script/
  
  This function is meant to run on a time-based trigger (I have it set for every 10 minutes).
  
  When run, the function will get some of the most recent emails in my inbox under the "Recruiters" tag
  
  The filter will automatically mark all emails as read and make sure all threads have the Recruiter
  tag before archiving it.

  The script will apply the same actions (mark as read, and archive) to the emails.
  
  For this function to run correctly you must enable the Advanced Gmail Service
  see: https://developers.google.com/apps-script/advanced/gmail
*/

function archiveRecruiters() {
  const labelName = "Recruiters";
  try {
    const label = GmailApp.getUserLabelByName(labelName);
    const recruiterAddresses = getEmailAddressesByLabel(labelName);
    archiveInboxAddressesToLabel(recruiterAddresses, label);
  } catch (e) {
    Logger.log(e.toString());
  }
}

function getEmailAddressesByLabel(label) {
  const addresses = new Set();

  // todo: could paginate it to get EVERY address
  GmailApp.search(`label:${label}`,0,50).forEach((thread) =>{
    const address = thread.getMessages()[0].getFrom();
    addresses.add(address);
  })

  return addresses;
}

function archiveInboxAddressesToLabel(addresses, label) {
  GmailApp.getInboxThreads()
    .filter((thread) => {
      const from = thread.getMessages()[0].getFrom();
      return addresses.has(from);
    })
    .forEach((thread) => {
      thread.addLabel(label);
      thread.markRead();
      thread.moveToArchive();
      console.log("archived email from", thread.getMessages()[0].getFrom());
    })
}
