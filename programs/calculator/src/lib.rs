use anchor_lang::prelude::*;

declare_id!("JDeZu9xoJEn8FhgTwbKkvNx2VihmT45eZ9AgyiafzpDc");

#[program]
pub mod calculator {
    use super::*;

    pub fn initialize(ctx: Context<SetupCalculator>) -> Result<()> {
        ctx.accounts.calculator.value = 0 ;        
        Ok(())
    }
    pub fn sum(ctx:Context<Evaluate>, unit: i64) -> Result<()> {
        ctx.accounts.calculator.add(unit) ;        
        Ok(())
    }
    pub fn subtract(ctx:Context<Evaluate>, unit: i64) -> Result<()> {
        ctx.accounts.calculator.remove(unit);        
        Ok(())
    }
    pub fn multiply(ctx:Context<Evaluate>, unit: i64) -> Result<()> {
        ctx.accounts.calculator.multiply(unit);        
        Ok(())
    }
    pub fn divide(ctx:Context<Evaluate>, unit: i64) -> Result<()> {
        ctx.accounts.calculator.divide_abs(unit);        
        Ok(())
    }
    pub fn reset(ctx:Context<Evaluate>) -> Result<()> {
        ctx.accounts.calculator.reset_value();        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SetupCalculator<'info> {
    #[account( init,payer=user, space = 27)]
   pub calculator : Account<'info,Calculator>,
    #[account(mut)]
   pub user: Signer<'info>,
   pub system_program: Program<'info,System> 
}

#[derive(Accounts)]
pub struct Evaluate<'info> {
    #[account(mut)]
    pub calculator : Account<'info,Calculator>,
}

#[account]
#[derive(Default)]
pub struct Calculator {
    value: i64
}

impl Calculator {

    pub fn add (&mut self, unit: i64) {
        self.value = self.value + unit ;
    }

    pub fn remove (&mut self, unit: i64) {
        self.value = self.value - unit ;
    }
    pub fn multiply (&mut self, unit: i64) {
        self.value = self.value * unit ;
    }

    pub fn divide_abs (&mut self, unit: i64) {
        self.value = self.value / unit ;
    }

    pub fn reset_value (&mut self, ) {
        self.value = 0 ;
    }


}
