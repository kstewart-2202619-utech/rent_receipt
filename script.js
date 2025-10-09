// ============================
// INITIALIZATION
// ============================

// Set default dates to today when page loads
window.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('receiptDate').value = today;
    document.getElementById('paymentDate').value = today;
});

// ============================
// FORM SUBMISSION HANDLER
// ============================

document.getElementById('receiptForm').addEventListener('submit', function(e) {
    // Prevent default form submission (page reload)
    e.preventDefault();
    
    // Collect all form data into an object
    const formData = {
        receiptNumber: document.getElementById('receiptNumber').value,
        receiptDate: document.getElementById('receiptDate').value,
        tenantName: document.getElementById('tenantName').value,
        tenantEmail: document.getElementById('tenantEmail').value,
        tenantPhone: document.getElementById('tenantPhone').value,
        landlordName: document.getElementById('landlordName').value,
        landlordPhone: document.getElementById('landlordPhone').value,
        propertyAddress: document.getElementById('propertyAddress').value,
        rentPeriod: document.getElementById('rentPeriod').value,
        rentAmount: parseFloat(document.getElementById('rentAmount').value),
        paymentMethod: document.getElementById('paymentMethod').value,
        paymentDate: document.getElementById('paymentDate').value,
        transactionRef: document.getElementById('transactionRef').value,
        notes: document.getElementById('notes').value,
        signature: document.getElementById('signature').value
    };

    // Update receipt with form data
    updateReceipt(formData);

    // Show success alert
    alert('Generate Receipt');
    
    // Scroll to receipt section smoothly
    document.getElementById('receiptSection').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
});

// ============================
// UPDATE RECEIPT FUNCTION
// ============================

function updateReceipt(formData) {
    // Update receipt header information
    document.getElementById('displayReceiptNumber').textContent = `Receipt #: ${formData.receiptNumber}`;
    document.getElementById('displayReceiptDate').textContent = `Date: ${formatDate(formData.receiptDate)}`;
    
    // Update tenant information
    document.getElementById('displayTenantName').textContent = formData.tenantName;
    
    // Update property information
    document.getElementById('displayPropertyAddress').textContent = formData.propertyAddress;
    document.getElementById('displayRentPeriod').textContent = formData.rentPeriod;
    
    // Update payment information
    document.getElementById('displayPaymentMethod').textContent = formData.paymentMethod;
    document.getElementById('displayPaymentDate').textContent = formatDate(formData.paymentDate);
    
    // Update rent amount with proper formatting
    document.getElementById('displayRentAmount').textContent = 
        `JMD $${formData.rentAmount.toLocaleString('en-US', {
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2
        })}`;
    
    // Update landlord information in footer
    document.getElementById('displayLandlordName').textContent = formData.landlordName;
    
    // Handle optional landlord phone (only show if provided)
    if (formData.landlordPhone) {
        document.getElementById('displayLandlordPhone').textContent = `Phone: ${formData.landlordPhone}`;
    } else {
        document.getElementById('displayLandlordPhone').textContent = '';
    }
    
    // Handle optional signature (only show if provided)
    if (formData.signature) {
        document.getElementById('displaySignature').textContent = formData.signature;
    } else {
        document.getElementById('displaySignature').textContent = '___________________';
    }

    // Handle optional transaction reference
    // Only show this row if transaction reference was provided
    if (formData.transactionRef) {
        document.getElementById('transactionRow').style.display = 'flex';
        document.getElementById('displayTransactionRef').textContent = formData.transactionRef;
    } else {
        document.getElementById('transactionRow').style.display = 'none';
    }

    // Handle optional notes
    // Only show this row if notes were provided
    if (formData.notes) {
        document.getElementById('notesRow').style.display = 'flex';
        document.getElementById('displayNotes').textContent = formData.notes;
    } else {
        document.getElementById('notesRow').style.display = 'none';
    }
}

// ============================
// RESET BUTTON HANDLER
// ============================

document.querySelector('button[type="reset"]').addEventListener('click', function() {
    // Show alert when clearing form
    alert('Clear Form');
    
    // Reset receipt to default values after a short delay
    setTimeout(function() {
        document.getElementById('displayReceiptNumber').textContent = 'Receipt #: ---';
        document.getElementById('displayReceiptDate').textContent = 'Date: ---';
        document.getElementById('displayTenantName').textContent = '---';
        document.getElementById('displayPropertyAddress').textContent = '---';
        document.getElementById('displayRentPeriod').textContent = '---';
        document.getElementById('displayPaymentMethod').textContent = '---';
        document.getElementById('displayPaymentDate').textContent = '---';
        document.getElementById('displayRentAmount').textContent = 'JMD $0.00';
        document.getElementById('displayLandlordName').textContent = 'Landlord/Manager';
        document.getElementById('displayLandlordPhone').textContent = '';
        document.getElementById('displaySignature').textContent = '___________________';
        document.getElementById('transactionRow').style.display = 'none';
        document.getElementById('notesRow').style.display = 'none';
        
        // Reset dates to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('receiptDate').value = today;
        document.getElementById('paymentDate').value = today;
    }, 100);
});

// ============================
// UTILITY FUNCTIONS
// ============================

/**
 * Format date from YYYY-MM-DD to "Month Day, Year"
 * Example: "2025-01-15" becomes "January 15, 2025"
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// ============================
// PRINT RECEIPT FUNCTION
// ============================

/**
 * Opens browser print dialog
 * User can print to paper or save as PDF
 */
function printReceipt() {
    alert('Print Receipt');
    window.print();
}

// ============================
// DOWNLOAD RECEIPT FUNCTION
// ============================

/**
 * Opens print dialog with friendly filename
 * User selects "Save as PDF" option
 */
function downloadReceipt() {
    alert('Download Receipt');
    
    // Create a friendly filename from receipt data
    const receiptNum = document.getElementById('receiptNumber').value || 'receipt';
    const date = document.getElementById('receiptDate').value || '';
    
    // Set document title (becomes default PDF filename)
    document.title = `Rent_Receipt_${receiptNum}_${date}`;
    
    // Open print dialog (user can select "Save as PDF")
    window.print();
}

// ============================
// EMAIL RECEIPT FUNCTION
// ============================

/**
 * Opens default email client with pre-filled receipt information
 * User can attach the printed/saved PDF manually
 */
function emailReceipt() {
    alert('Email Receipt');
    
    // Get current form values
    const tenantEmail = document.getElementById('tenantEmail').value;
    const receiptNumber = document.getElementById('receiptNumber').value;
    const tenantName = document.getElementById('tenantName').value;
    const rentAmount = document.getElementById('rentAmount').value;
    const rentPeriod = document.getElementById('rentPeriod').value;
    
    // Create professional email subject
    const subject = `Rent Receipt - ${receiptNumber}`;
    
    // Create professional email body with receipt details
    const body = `Dear ${tenantName},

Please find your rent receipt details below.

Receipt Number: ${receiptNumber}
Rent Period: ${rentPeriod}
Amount Paid: JMD ${parseFloat(rentAmount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}

Thank you for your payment.

Best regards,
Property Management`;
    
    // Open email client with pre-filled information
    // If tenant email exists, use it; otherwise leave "To:" field empty
    if (tenantEmail) {
        window.location.href = `mailto:${tenantEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
}

// ============================
// END OF SCRIPT
// ============================
